import { eq, desc, asc, and, or, gte, lte, ilike, count } from "drizzle-orm";
import { db } from "../db/index.js";
import { events } from "../db/schemas/event.schema.js";
import { files } from "../db/schemas/file.schema.js";

const formatEventForResponse = (event) => {
  if (!event) return null;
  const creator = event.creator
    ? {
        id: event.creator.id,
        name: event.creator.name,
        email: event.creator.email,
      }
    : null;
  return {
    id: event.id,
    title: event.title,
    description: event.description,
    start_time: event.start_time?.toISOString?.() ?? event.start_time,
    end_time: event.end_time?.toISOString?.() ?? event.end_time,
    location: event.location,
    capacity: event.capacity,
    cta_title: event.cta_title,
    cta_url: event.cta_url,
    contact_number: event.contact_number,
    contact_mail: event.contact_mail,
    contact_person_name: event.contact_person_name,
    imageUrl: event.imageUrl,
    created_at: event.created_at?.toISOString?.() ?? event.created_at,
    creator_id: event.creator_id,
    creator,
    tag: event.tags
      ? {
          id: event.tags.id,
          value: event.tags.value,
          type: event.tags.type,
        }
      : null,
    files:
      event.files?.map((file) => ({
        id: file.id,
        title: file.title,
        url: file.url,
      })) ?? [],
  };
};

const validateFilesInput = (filesData) => {
  if (filesData) {
    if (!Array.isArray(filesData)) {
      return "Files must be an array.";
    }
    for (const file of filesData) {
      if (!file.url || !file.title) {
        return "Each file object must have a 'url' and a 'title'.";
      }
    }
  }
  return null;
};

const createEvent = async (req, res) => {
  const {
    title,
    description,
    start_time,
    end_time,
    location,
    capacity,
    cta_title,
    cta_url,
    contact_number,
    contact_mail,
    contact_person_name,
    imageUrl,
    tag_id,
    files: filesData,
  } = req.body;

  if (
    !title ||
    !description ||
    !start_time ||
    !end_time ||
    !location ||
    !cta_title ||
    !cta_url ||
    !imageUrl ||
    !tag_id
  ) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  const filesError = validateFilesInput(filesData);
  if (filesError) {
    return res.status(400).json({ message: filesError });
  }

  try {
    const newEvent = await db.transaction(async (tx) => {
      const [createdEvent] = await tx
        .insert(events)
        .values({
          title,
          description,
          start_time: new Date(start_time),
          end_time: new Date(end_time),
          location,
          capacity: capacity ? parseInt(capacity, 10) : null,
          cta_title,
          cta_url,
          contact_number,
          contact_mail,
          contact_person_name,
          imageUrl,
          creator_id: parseInt(req.user.id, 10),
          tag_id: parseInt(tag_id, 10),
        })
        .returning();

      if (filesData && filesData.length > 0) {
        const filesToInsert = filesData.map((file) => ({
          ...file,
          entity_id: createdEvent.id,
          entity_type: "event",
        }));
        await tx.insert(files).values(filesToInsert);
      }

      return tx.query.events.findFirst({
        where: eq(events.id, createdEvent.id),
        with: {
          creator: { columns: { password: false } },
          tags: true,
          files: true,
        },
      });
    });

    res.status(201).json({
      message: "Event created successfully",
      event: formatEventForResponse(newEvent),
    });
  } catch (error) {
    console.error("Create event error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getEvents = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      tag,
      startDate,
      endDate,
      search,
      sortBy = "start_time",
      order = "desc",
    } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const offset = (pageNumber - 1) * limitNumber;

    const conditions = [];

    if (search) {
      const searchKeyword = `%${search}%`;
      conditions.push(
        or(
          ilike(events.title, searchKeyword),
          ilike(events.description, searchKeyword),
          ilike(events.location, searchKeyword)
        )
      );
    }

    if (startDate) {
      conditions.push(gte(events.start_time, new Date(startDate)));
    }
    if (endDate) {
      conditions.push(lte(events.end_time, new Date(endDate)));
    }

    if (tag) {
      const tagId = parseInt(tag, 10);
      conditions.push(eq(events.tag_id, tagId));
    }

    const finalConditions = conditions.length ? and(...conditions) : undefined;

    const [totalResult, eventsData] = await Promise.all([
      db.select({ total: count() }).from(events).where(finalConditions),
      db.query.events.findMany({
        where: finalConditions,
        orderBy:
          sortBy === "start_time"
            ? order === "asc"
              ? [asc(events.start_time)]
              : [desc(events.start_time)]
            : [desc(events.created_at)],
        limit: limitNumber,
        offset: offset,
        with: {
          tags: true,
          files: true,
        },
      }),
    ]);

    const processedEvents = eventsData.map((event) => {
      const formattedEvent = formatEventForResponse(event);
      if (formattedEvent.title && formattedEvent.title.length > 100) {
        formattedEvent.title = formattedEvent.title.slice(0, 100) + " ...";
      }
      if (formattedEvent.description) {
        const words = formattedEvent.description.split(" ");
        if (words.length > 20) {
          formattedEvent.description = words.slice(0, 20).join(" ") + " ...";
        }
      }
      return formattedEvent;
    });

    const total = totalResult[0].total;
    const totalPages = Math.ceil(total / limitNumber);

    res.status(200).json({
      result: processedEvents,
      total,
      totalPages,
      currentPage: pageNumber,
    });
  } catch (error) {
    console.error("Get events error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await db.query.events.findFirst({
      where: eq(events.id, parseInt(id, 10)),
      with: {
        creator: { columns: { password: false } },
        tags: true,
        files: true,
      },
    });
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }
    res.status(200).json(formatEventForResponse(event));
  } catch (error) {
    console.error("Get event by ID error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    start_time,
    end_time,
    location,
    capacity,
    cta_title,
    cta_url,
    contact_number,
    contact_mail,
    contact_person_name,
    imageUrl,
    tag_id,
    files: filesData,
  } = req.body;
  const eventId = parseInt(id, 10);

  const filesError = validateFilesInput(filesData);
  if (filesError) {
    return res.status(400).json({ message: filesError });
  }

  try {
    const updatedEvent = await db.transaction(async (tx) => {
      const [existingEvent] = await tx
        .select({ id: events.id })
        .from(events)
        .where(eq(events.id, eventId));
      if (!existingEvent) {
        throw new Error("EventNotFound");
      }
      const updatedData = {};
      if (title) updatedData.title = title;
      if (description) updatedData.description = description;
      if (start_time) updatedData.start_time = new Date(start_time);
      if (end_time) updatedData.end_time = new Date(end_time);
      if (location) updatedData.location = location;
      if (capacity !== undefined)
        updatedData.capacity = capacity ? parseInt(capacity, 10) : null;
      if (cta_title) updatedData.cta_title = cta_title;
      if (cta_url) updatedData.cta_url = cta_url;
      if (contact_number) updatedData.contact_number = contact_number;
      if (contact_mail) updatedData.contact_mail = contact_mail;
      if (contact_person_name)
        updatedData.contact_person_name = contact_person_name;
      if (imageUrl) updatedData.imageUrl = imageUrl;
      if (tag_id) updatedData.tag_id = parseInt(tag_id, 10);

      if (Object.keys(updatedData).length > 0) {
        await tx.update(events).set(updatedData).where(eq(events.id, eventId));
      }

      if (filesData !== undefined) {
        await tx
          .delete(files)
          .where(
            and(eq(files.entity_id, eventId), eq(files.entity_type, "event"))
          );
        if (filesData.length > 0) {
          const filesToInsert = filesData.map((file) => ({
            ...file,
            entity_id: eventId,
            entity_type: "event",
          }));
          await tx.insert(files).values(filesToInsert);
        }
      }

      return tx.query.events.findFirst({
        where: eq(events.id, eventId),
        with: {
          creator: { columns: { password: false } },
          tags: true,
          files: true,
        },
      });
    });

    res.status(200).json({
      message: "Event updated successfully",
      event: formatEventForResponse(updatedEvent),
    });
  } catch (error) {
    if (error.message === "EventNotFound") {
      return res.status(404).json({ message: "Event not found." });
    }
    console.error("Update event error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  const eventId = parseInt(id, 10);
  try {
    await db.transaction(async (tx) => {
      await tx
        .delete(files)
        .where(
          and(eq(files.entity_id, eventId), eq(files.entity_type, "event"))
        );
      const [deletedEvent] = await tx
        .delete(events)
        .where(eq(events.id, eventId))
        .returning();
      if (!deletedEvent) {
        throw new Error("EventNotFound");
      }
    });
    return res.status(200).json({ message: "Event deleted successfully." });
  } catch (error) {
    if (error.message === "EventNotFound") {
      return res.status(404).json({ message: "Event not found." });
    }
    console.error("Delete event error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { createEvent, getEvents, getEventById, updateEvent, deleteEvent };
