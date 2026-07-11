package com.enterprise.iiot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class IiotPlatformApiApplication {

	public static void main(String[] args) {

	    System.out.println("Default TimeZone = " + java.util.TimeZone.getDefault());
	    System.out.println("user.timezone = " + System.getProperty("user.timezone"));
		SpringApplication.run(IiotPlatformApiApplication.class, args);
	}

}
