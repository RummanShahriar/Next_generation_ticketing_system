package com.three.ngts.Entity.CustomEntity;

import com.three.ngts.Entity.District;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class TwoDistrict {
    private District source;
    private District destination;

    private Timestamp timestamp;
}
