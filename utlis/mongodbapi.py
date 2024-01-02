from mongodbconnect import connect

def fetch_data(query, collection_name):
    connect()
    from mongodbconnect import database
    result = database[collection_name].find(query)
    return list(result)

def insert_data(query, collection_name):
    connect()
    from mongodbconnect import database
    collection = database[collection_name]
    if isinstance(query, dict):
        result = collection.insert_one(query)
    elif isinstance(query, list):
        result = collection.insert_many(query)
    return result

def update_data(query, update, collection_name):
    connect()
    from mongodbconnect import database
    collection = database[collection_name]
    result = collection.update_one(query, update)
    return result

def delete_data(query, collection_name):
    connect()
    from mongodbconnect import database
    collection = database[collection_name]
    result = collection.delete_one(query)
    return result


if __name__ == '__main__':
    query = {'username': 'Dominic_cwc'}
    update = {'$set': {'name': 'Dominic Chow'}}
    collection_name = 'Users'
    result = update_data(query, update, collection_name)
    print(result)
    
    # delete a field
    update = {'$unset': {'name': 1}}
    result = update_data(query, update, collection_name)
    print(result)
    pass
