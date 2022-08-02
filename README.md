# Autown

###### A Blockchain Solution to simplify the complex process of Automobile sale and resale.

## The Frontend

This repository contains the frontend dashboard for the Autown platform. The dashboard is a demo of vehicle minting and ownership transfer.

## The Users

The users of the Autown platform are divided into 3 categories.

1. Manufacturers
2. Dealerships
3. Consumers

The automobiles are minted against their chassis numbers by the first category which introduces them to the blockchain. Then throughout the life of a vehicle this blockchain will track various events of its life. Sale, Resale, Checkup, Repairs, and such events.

The dashboard also provides the interface to transfer a vehicle from one owner to another. This flow goes downwards on the category list. Manufacturers transfer to Dealerships, Dealerships transfer to Consumers and Consumers can transfer in-between themselves creating a complete ecosystem of sale and resale.

User onboarding is controlled through the governing organization of Autown and road transport authorities.

# The Backend

This platform communicates with a python backend to write and read data to and from a demo blockchain run by dummy miners. The backend repository and further details can be found at [autown-backend](https://github.com/snick-m/autown-backend)