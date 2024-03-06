package com.app;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.app.dto.ParkingDetailsDto;
import com.app.pojos.ParkingDetails;

@SpringBootApplication
public class Day15RestBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(Day15RestBackendApplication.class, args);
    }

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        // Add explicit mapping for detailsId property
        modelMapper.createTypeMap(ParkingDetailsDto.class, ParkingDetails.class)
                   .addMapping(src -> src.getUserId(), ParkingDetails::setDetailsId)
                   .addMapping(src -> src.getAreaId(), ParkingDetails::setDetailsId)
                   .addMapping(src -> src.getZoneId(), ParkingDetails::setDetailsId)
                   .addMapping(src -> src.getSlotId(), ParkingDetails::setDetailsId);

        return modelMapper;
    }
}
