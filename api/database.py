import mysql.connector

def get_connection():
    return mysql.connector.connect(
        host = "localhost",
        user = "root",
        password = "FydV?^UD_C`0",
        database = "blogs"
    )
