const Pool = require("pg").Pool;
let url = 'postgres://hddufohk:1ur6fgrvf7bVO_oN61Qbd-xr5gBuk_mi@salt.db.elephantsql.com:5432/hddufohk';
const pool = new Pool({
    connectionString: url
});
module.exports = pool;