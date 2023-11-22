package com.mycompany.myapp.domain;

import javax.persistence.*;

@Entity
@Table(name = "day_chuyen")
public class DayChuyen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "day_chuyen")
    private String dayChuyen;

    public DayChuyen(Long id, String dayChuyen) {
        this.id = id;
        this.dayChuyen = dayChuyen;
    }

    public DayChuyen() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDayChuyen() {
        return dayChuyen;
    }

    public void setDayChuyen(String dayChuyen) {
        this.dayChuyen = dayChuyen;
    }
}
