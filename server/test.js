const { drizzle } = require("drizzle-orm");

const db = drizzle({
    url: "postgresql://postgres.bxooyujcanlnwggpnwkj:zb0NMtFYXz5VMWVF@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres"
});

(async () => {
  const result = await db.execute('select 1');
  console.log(result);
})();
