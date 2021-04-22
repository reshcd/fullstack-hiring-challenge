import base64

def stringToB64(string):
    return base64.b64encode(string.encode('ascii')).decode('ascii')

def b64ToString(base64_message):
    return base64.b64decode(base64_message.encode('ascii')).decode('ascii')

def isEmpty(data):
    s = str(data).strip()
    if(len(s) == 0 or s == None):
        return True
    return False
