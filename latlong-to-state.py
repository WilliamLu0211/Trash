import urllib.request
import json
import ssl


context = ssl._create_unverified_context()

def get_state():

    f = open("data/openAQ.csv", "r")
    lines = f.readlines()
    print(lines)
    sum = lines[0]
    lines = lines[1:]

    for line in lines:
        line = line.split(",")
        _lat = str(line[8])
        _long = str(line[9])
        #print(_lat, _long)
        url = "http://open.mapquestapi.com/geocoding/v1/reverse?key=TRZray6mAQGYacpvsM0Hz9pZjIgZ2Fyj&location={lat},{long}".format(lat = _lat, long = _long)
        cri = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'}) # SETS UP REQUEST

        stuff = urllib.request.urlopen(cri, context=context) # GETS STUFF
        js = stuff.read() # gets info from urlopen
        jason = json.loads(js) # loads into JSON
        # try:
        if jason["results"][0]['locations'][0]["adminArea3Type"] == "State":
            line[1] = jason["results"][0]['locations'][0]["adminArea3"]
            sum += ",".join(line)
        # except:
        #     print(jason["results"][0]['locations'][0]["adminArea3"])
        #     print(line[0])

    f.close()
    g = open("data/openAQ.csv", "w")
    g.write(sum)
    g.close()
    print("done")


    #
    # print(jason)

get_state()
