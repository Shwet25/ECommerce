const { Pool } = require('pg')
const pool = new Pool({
    user: 'postgres',
    password: '2580',
    database: 'ecommerce',
    host: 'localhost',
    port: '5000',
    min_pool_size: '5',
  reserve_pool_size: '5',
  server_idle_timeout: '300',
  idle_transaction_timeout: '300',
  max_client_conn: '10'
  
});


async function execute(querytext) {
    const client = await pool.connect()
    try{
        await client.query('BEGIN')
        const res = await client.query(querytext);
        await client.query('COMMIT')
        return res;

    }
    catch (error){
        await client.query('ROLLBACK') 
    }
    finally {
        client.release()
    }
}

pool.connect(()=>{
    console.log(" connection done")
})
module.exports=execute;