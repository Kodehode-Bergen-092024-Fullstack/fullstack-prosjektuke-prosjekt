import codecs
from dataclasses import dataclass, asdict
import itertools
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

pets = ["cat", "dog"]

spaces = ["big space", "small space"]

all_properties = [*foods, *pets, *spaces, "vegetarian", "no pets"]


@dataclass
class Person:
    name: str
    surname: str
    # def __init__(self, name: str, surname: str) -> None:
    #     self.name = name
    #     self.surname = surname


@dataclass
class Record:
    image: str
    surname: str
    title: str
    description: str
    preferences: list[str]
    members: list[Person]

    @classmethod
    def generate(cls):
        surname = random.choice(surnames)
        num_members = random.randint(1, 10)
        members = []
        for _ in range(num_members):
            name = random.choice(names)
            person = Person(name, surname)
            members.append(person)

        num_properties = random.randint(1, 7)
        _properties = []
        pet = bool(random.randint(0, 1))
        vegetarian = bool(random.randint(0, 1))
        for _ in range(num_properties):
            choice = random.choice(all_properties)
            if pet and choice in pets:
                _properties.append(choice)
            elif not pet:
                _properties.append("no pets")
            if (
                not vegetarian
                and choice in foods
                and not any(food in _properties for food in foods)
            ):
                _properties.append(choice)
            elif vegetarian:
                _properties.append("vegetarian")
            if choice in spaces and not any(space in _properties for space in spaces):
                _properties.append(choice)
        description = f"Lorem Ipsum {surname} family dolor sit amet, consectetur"
        title = f"The {surname} family"
        image = ""

        return cls(image, surname, title, description, list(set(_properties)), members)

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
