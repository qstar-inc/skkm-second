import csv
import json
import os

groups = ['tel','aci']
group = 'aci'

def create_json(filename):
    data = []

    with open(filename, 'r') as tsvfile:
        reader = csv.reader(tsvfile, delimiter=';')
        for row in reader:
            if not row:
                continue
            if (row[9] != "Tarek" and row[9] != "Azizul"):
                continue
            item = {
                "date": row[0],
                "shop_id": int(row[1]) if row[1] else 0,
                "name": row[2],
                "invoice": int(row[3]) if row[3] else 0,
                "payment": int(row[4]) if row[4] else 0,
                "return": int(row[5]) if row[5] else 0,
                "comm": int(row[6]) if row[6] else 0,
                "carried": int(row[7]) if row[7] else 0,
                "invID": int(row[8]) if row[8] else 0,
                "sr": row[9],
                "note": row[10],
                "d_balance": int(row[11]) if row[11] else 0,
                "t_balance": int(row[12]) if row[12] else 0
            }
            data.append(item)
    
    # Write data to the JSON file
    with open(f"data/credit-{group}.json", "w") as jsonfile:
        json.dump(data, jsonfile, indent=4)

def main():
    filename = f"preprocess/credit_{group}.tsv"
    if not os.path.exists(filename):
        print(f"Error: File {filename} does not exist.")
        return
    
    print(f"Reading file {filename}...")
    create_json(filename)
    print(f"JSON file created: credit-{group}.json")

if __name__ == "__main__":
    main()
