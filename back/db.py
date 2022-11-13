import pymongo
import yaml
from yaml.loader import SafeLoader
from pymongo import MongoClient
#from pprint import pprint

with open('../.secrets.yaml') as f:
    data = yaml.load(f, Loader=SafeLoader)
    bindingarstrongur = data["DatabaseConnectionString"]

# Choose the appropriate client
cluster = MongoClient(bindingarstrongur)

#Create database
mydb = cluster["lonarfolk"]

#Collection is mini database
collection = mydb["lonarfolk"]

post1 = {"lonarfolk_id":1, "navn": "Hanus"}
post2 = {"lonarfolk_id":2, "navn": "UGGI"}
post3 = {"lonarfolk_id":3, "navn": "DUGGI"}
# {} = Data skal altid hava _id

# Insert_One sendur variablar til databasan.
collection.insert_one(post1)
collection.insert_one(post2)
collection.insert_one(post3)

# # Connect to the test db 
# db=client.test

# # Use the employee collection
# employee = db.employee
# employee_details = {
#     'Name': 'Raj Kumar',
#     'Address': 'Sears Streer, NZ',
#     'Age': '42'
# }

# # Use the insert method
# result = employee.insert_one(employee_details)

# # Query for the inserted document.
# Queryresult = employee.find_one({'Age': '42'})
# pprint(Queryresult)
