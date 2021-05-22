import json
import requests

URL = 'http://localhost:4000/employees'

with open('Employee.json', 'r') as f:
    data = json.load(f)


for employee in data:
    res = requests.post(URL, json=employee)
    print(employee['email'], res.json()['message'])


