import codecs
from dataclasses import dataclass, asdict
import random
import json
import os

surnames = [
    "Hansen",
    "Johansen",
    "Olsen",
    "Larsen",
    "Andersen",
    "Pedersen",
    "Nilsen",
    "Kristiansen",
    "Jensen",
    "Karlsen",
    "Johnsen",
    "Pettersen",
    "Eriksen",
    "Berg",
    "Haugen",
    "Hagen",
    "Johannesen",
    "Andreassen",
    "Jacobsen",
    "Dahl",
]

names = [
    "Anne",
    "Inger",
    "Kari",
    "Marit",
    "Ingrid",
    "Liv",
    "Eva",
    "Berit",
    "Astrid",
    "Bjørg",
    "Benedicte",
    "Emma",
    "Sofie",
    "Linnea",
    "Sara",
    "Emilie",
    "Ingrid",
    "Thea",
    "Leah",
    "Ida",
    "Jan",
    "Per",
    "Bjørn",
    "Ole",
    "Lars",
    "Kjell",
    "Knut",
    "Arne",
    "Svein",
    "Thomas",
    "Lucas",
    "Emil",
    "Mathias",
    "Jonas",
    "Alexander",
    "William",
    "Oskar",
    "Magnus",
    "Markus",
    "Oliver",
]

foods = ["pinnekjøtt", "ribbe", "juleskinke", "grandiosa"]

allergens = ["cat", "dog", "nuts"]

family_sizes = ["big", "small"]

all_properties = [
    *foods,
    *allergens,
    *family_sizes,
    "vegetarian",
    "no pets",
    "religious",
]


# @dataclass
# class Person:
#     name: str
#     surname: str


@dataclass
class Record:
    image: str
    # surname: str
    title: str
    description: str
    preferences: list[str]
    # members: list[Person]

    @classmethod
    def generate(cls):
        surname = random.choice(surnames)
        # num_members = random.randint(1, 10)
        # members = []
        # for _ in range(num_members):
        #     name = random.choice(names)
        #     person = Person(name, surname)
        #     members.append(person)

        num_properties = random.randint(1, len(all_properties))
        properties = []
        religious = bool(random.randint(0, 1))
        kids = bool(random.randint(0, 1))
        if religious:
            properties.append("religious")
        if kids:
            properties.append("children")
        vegetarian = bool(random.randint(0, 1))
        for _ in range(num_properties):
            choice = random.choice(all_properties)
            if (
                not vegetarian
                and choice in foods
                and not any(food in properties for food in foods)
            ):
                properties.append(choice)
            elif vegetarian:
                properties.append("vegetarian")
            if choice in family_sizes and not any(
                space in properties for space in family_sizes
            ):
                properties.append(choice)
        description = f"Lorem Ipsum {surname} family dolor sit amet, consectetur"
        title = f"The {surname} family"
        image = "/image/family/"

        return cls(
            image=image,
            # surname,
            title=title,
            description=description,
            preferences=list(set(properties)),
            # members=members
        )

    def to_dict(self):
        return asdict(self)


def main():
    print("Generating dummy data")

    families = [Record.generate().to_dict() for _ in range(20)]
    print(f"Opening {os.getcwd()}/generated_familes.json")
    with open("./generated_families.json", "w", encoding="utf-8") as f:
        print("Serialising data")
        json_str = json.dumps(families)
        s = codecs.decode(json_str, "unicode-escape")
        print(f"{f.write(s)} bytes written")
    print("Data generated successfully")


if __name__ == "__main__":
    main()
