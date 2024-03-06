package com.app.services;

import java.util.List;
import java.util.Optional;

import com.app.dto.LoginForm;
import com.app.pojos.CarDetails;
import com.app.pojos.ParkingDetails;

public interface BaseService {

	//Forgot password
		String getPassword(LoginForm loginForm);
		
		List<ParkingDetails> getAllParkingDetails();
		
		//Get car details
		List<CarDetails> getAllCars();

		List<CarDetails> getCarDetails(int userId);

		Optional<ParkingDetails> getParkingDetails(int userId);
}
