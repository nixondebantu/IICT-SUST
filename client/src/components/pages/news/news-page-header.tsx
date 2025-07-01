export default function NewsPageHeader() {
  return (
    <section
      id="page-header"
      className="bg-gradient-to-r from-primary to-red-700 text-primary-foreground py-16"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            News &amp; Updates
          </h1>
          <p className="text-xl opacity-90">
            Stay informed about the latest achievements, research breakthroughs,
            and developments at IICT
          </p>
        </div>
      </div>
    </section>
  );
}
