const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres', 
    password: 'postgres',
    database: 'ecommerce', 
    host: 'localhost',
    port: '5432',
    min_pool_size: 5,
    reserve_pool_size: 5,
    server_idle_timeout: 300,
    idle_transaction_timeout: 300,
    max_client_conn: 10
})

async function execute(QueryText) {
    const client = await pool.connect()
    try {

        await client.query("BEGIN")

        const res = await client.query(QueryText);

        await client.query("COMMIT")

        return res

    } catch (error) {

        await client.query("ROLLBACK")

    } finally {

        client.release()
    }
}

module.exports=execute;