package com.ua.booking.online.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

public class Booking {
    @Id
    String id;
    @Field(value = "userId")
    String userId;
    @Field(value = "roomId")
    String roomId;
    @Field(value = "price")
    int price;// all price on several day
    @Field(value = "approve")
    boolean approve;
}
