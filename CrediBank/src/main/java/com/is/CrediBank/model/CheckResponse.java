package com.is.CrediBank.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class CheckResponse {

    @JsonProperty("date")
    private String date;

    @JsonProperty("checkID")
    private String checkID;

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getCheckID() {
        return checkID;
    }

    public void setCheckID(String checkID) {
        this.checkID = checkID;
    }

    @Override
    public String toString() {
        return "CheckResponse{" +
                "date='" + date + '\'' +
                ", checkID='" + checkID + '\'' +
                '}';
    }
}