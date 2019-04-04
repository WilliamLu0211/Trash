import os
import json

import pandas

def col_query(file_name, *args):
    try:
        data = {}
        csvdata = pandas.read_csv(file_name)

        for arg in args:
            if str(arg) in list(csvdata):
                data[str(arg)] = json.dumps(csvdata[str(arg)].tolist())

        return data

    except Exception as e:
        print(e)

res = col_query('openAQ.csv', 'location', 'city', 'value', 'latitude', 'longitude')
print(res)
