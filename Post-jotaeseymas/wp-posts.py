import xml.etree.ElementTree as ET
import json

tree = ET.parse('jotaeseymas.xml')
root = tree.getroot()
posts = []
content_encoded = '{http://purl.org/rss/1.0/modules/content/}encoded'

for elem in root.findall('./channel/item'):
  post = {}
  post['tags'] = []
  for child in elem:
    if child.tag == 'title' and child.text.isupper():
      post['title'] = child.text
    if child.tag == content_encoded and child.text is not None:
      post['content'] = child.text
    if child.tag == 'pubDate':
      post['date'] = child.text
    if child.tag == 'category':
      post['tags'].append(child.attrib['nicename'])

  posts.append(post)

with open('data.json', 'w') as fh:
  data = json.dumps(posts[1:-3])
  fh.write(data)

print('ok')
