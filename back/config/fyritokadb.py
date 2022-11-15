from pymongo import MongoClient
import yaml
with open('../.secrets.yaml') as f:
    data = yaml.load(f, Loader=yaml.SafeLoader)
    bindingarstrongur = data["DatabaseConnectionString"]

cluster = MongoClient(bindingarstrongur)
# Create/connect to database
mydb = cluster["Fyritoka"]
# connect to collection
collection = mydb["Fyritoka"]
