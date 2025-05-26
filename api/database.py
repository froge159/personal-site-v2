import os
import mysql.connector
from dotenv import load_dotenv

load_dotenv()
read_connection = None
write_connection = None

async def connect_to_db():
    global read_connection, write_connection
    if read_connection is None or not read_connection.is_connected():
        try:
            print(f"Attempting to connect to read DB")

            read_connection = mysql.connector.connect(
                host= os.getenv("DB_HOST_READ"),
                port=os.getenv("DB_PORT_READ"),
                user=os.getenv("DB_USER_READ"),
                password=os.getenv("DB_PASSWORD_READ"),
                database=os.getenv("DB_NAME_READ"),
            )
            print("Read Database connection established.")
        except mysql.connector.Error as err:
            print(f"Error connecting to read database: {err}")
            read_connection = None 
            raise 

    if write_connection is None or not write_connection.is_connected():
        try:
            print(f"Attempting to connect to write DB")

            write_connection = mysql.connector.connect(
                host=os.getenv("DB_HOST_WRITE"),
                port=os.getenv("DB_PORT_WRITE"),
                user=os.getenv("DB_USER_WRITE"),
                password=os.getenv("DB_PASSWORD_WRITE"),
                database=os.getenv("DB_NAME_WRITE"),
            )
            print("Write database connection established.")
        except mysql.connector.Error as err:
            print(f"Error connecting to write database: {err}")
            write_connection = None 
            raise

async def close_db_connection():
    global read_connection, write_connection
    if read_connection and read_connection.is_connected():
        read_connection.close()
        print("Read Database connection closed.")
    if write_connection and write_connection.is_connected():
        write_connection.close()
        print("Write Database connection closed.")

def get_read_db_cursor(dictionary=False):
    if read_connection is None or not read_connection.is_connected():
        raise RuntimeError("Read Database connection is not established or is closed.")
    return read_connection.cursor(dictionary=dictionary)

def get_write_db_cursor(dictionary=False):
    if write_connection is None or not write_connection.is_connected():
        raise RuntimeError("Write Database connection is not established or is closed.")
    return write_connection.cursor(dictionary=dictionary)