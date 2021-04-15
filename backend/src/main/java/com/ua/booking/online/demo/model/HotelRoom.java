package com.ua.booking.online.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

public class HotelRoom {

    @Id
    int id;
    @Field(value = "name")
    String name;
    @Field(value = "rating")
    double rating;
    @Field(value = "price")
    int price;
    @Field(value = "number_seats")
    int numberSeats;
    @Field(value = "status")
    boolean status;
}
