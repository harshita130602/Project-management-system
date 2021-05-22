import requests
import pandas as pd
URL = "http://localhost:4000/projects"


res = requests.get(URL)
if res.status_code != 200:
    print("Error: ", res.json()['message'])
else:
    df = pd.json_normalize(res.json()['projects'])
    if len(df) > 0:
        df = df.drop(['_id', '__v', 'skills'], axis=1)
        print(df)
    else: 
        print("No Projects found")