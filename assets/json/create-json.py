# -*- coding: utf-8 -*-
# creates data.json file for batching of predictions
# navigate to images directory, use tree command to generate list of files
# tree > ../json/tree.txt
# navigate to json directory, run python script to generate json file of images
# python main.py

import json
text = open('tree.txt', 'rb')
data = {"images": []}
for line in text:
    import re
    if re.match('├── ', line):
        data["images"].append(line.split('├── ')[1].strip())
    elif re.match('└── ', line):
        data["images"].append(line.split('└── ')[1].strip())
    else:
        print line

with open('data.json', 'w') as f:
    json.dump(data, f)
