import pymysql

try:
    conn = pymysql.connect(
        host='localhost',
        user='root',
        password='rehan15',
        database='atharva'
    )
    cursor = conn.cursor()

    print("--- LATEST 5 WORKLOADS ---")
    cursor.execute('SELECT id, access_frequency, reuse_distance, workload_type FROM workloads ORDER BY id DESC LIMIT 5')
    for row in cursor.fetchall():
        print(row)

    print("\n--- LATEST 5 POLICIES ---")
    cursor.execute('SELECT id, workload_id, predicted_policy, confidence, hybrid_ratio FROM policies ORDER BY id DESC LIMIT 5')
    for row in cursor.fetchall():
        print(row)

    print("\n--- LATEST 5 CACHE METRICS (+ENERGY aware) ---")
    cursor.execute('SELECT id, cache_hit_rate, latency, energy_usage, power_consumption FROM cache_metrics ORDER BY id DESC LIMIT 5')
    for row in cursor.fetchall():
        print(row)

    conn.close()
except Exception as e:
    print(f"Error: {e}")
