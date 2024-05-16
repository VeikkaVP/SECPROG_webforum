import sys
import os

# This ensures the directory where run.py resides is in Python's search path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from app import create_app


def db_check():
    while True:
        usr_input = input("Do you want to wipe the database from the previous session? Enter 'yes' to wipe: ")
        if usr_input.lower() == 'yes':
            return True
        else:
            return False


#bool_wipe = db_check()
bool_wipe = True


app = create_app(bool_wipe)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=True)
