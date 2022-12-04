import requests
import json
import uuid

def main():
    url = 'http://localhost:5001/v1/users'
    headers = {'Accept': 'application/json'}

    for i in range(1, 100):
        response = requests.put(url, headers=headers, data={
            "id": str(uuid.uuid4()),
            "email": "admin{}@mail.com".format(str(i)),
            "password": "admin"
        })

if __name__ == "__main__":
    main()