import requests as req
import sys

# ISBN = sys.argv[1]
 
ISBN = input('What is your ISBN?\n') 

Auth_Key = {'Authorization': '48477_940f8a547364d0d1f282810594ae2f53'}
resp = req.get('https://api2.isbndb.com/book/%s' %ISBN, headers=Auth_Key)

print(resp.json())