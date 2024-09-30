import requests
from bs4 import BeautifulSoup
import json

# Define the scraping method
def scrape_scholarship_data(stem_url, url, headers, output_file):
    # Lists to store the data
    cat_list = []
    href_list = []
    eligibility_list = []
    cleaned_eligibility_list = []

    # Fetch and parse the main webpage
    webpage = requests.get(url, headers=headers).text
    soup = BeautifulSoup(webpage, 'html.parser')

    # Get the list of categories and URLs
    all_categories = soup.find('div', class_="resp-tabs-container hor_1")
    sub_categories_text = all_categories.find_all('li')
    for i in sub_categories_text:
        cat_list.append(i.text.strip())

    anchor_tags = all_categories.find_all('a')
    for i in anchor_tags:
        href_list.append(stem_url + i.get('href'))

    # Fetch the eligibility details for each category
    for i in href_list:
        subpage = requests.get(i, headers=headers).text
        sub_soup = BeautifulSoup(subpage, 'html.parser')
        eligibility = sub_soup.find_all('ul', class_="list")[2].text
        eligibility_list.append(eligibility)

    # Clean the eligibility text
    for i in eligibility_list:
        cleaned_text = i.replace('\r\n', '').strip()
        cleaned_eligibility_list.append(cleaned_text)

    # Create a dictionary to store the results
    result = {
        "categories": cat_list,
        "links": href_list,
        "eligibility": cleaned_eligibility_list
    }

    # Write the result to a JSON file
    with open(output_file, 'w') as file:
        json.dump(result, file, indent=4)

# URL and headers
stem_url = "https://mahadbt.maharashtra.gov.in/"
url = "https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51AA07C7E01997E4885"
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; Win 64 ; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Safari/537.36'}

# File to save the JSON response
output_file = 'scholarship_data.json'

# Call the function and save the JSON file
scrape_scholarship_data(stem_url, url, headers, output_file)
print(f"Data has been saved to {output_file}")
