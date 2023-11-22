package com.mycompany.myapp.domain;

import javax.persistence.*;

@Entity
@Table(name = "kich_ban_change_status")
public class KichBanChangeStatus {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ma_kich_ban")
    private String maKichBan;

    @Column(name = "color_change")
    private String colorChange;

    public KichBanChangeStatus() {}

    public KichBanChangeStatus(Long id, String maKichBan, String colorChange) {
        this.id = id;
        this.maKichBan = maKichBan;
        this.colorChange = colorChange;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMaKichBan() {
        return maKichBan;
    }

    public void setMaKichBan(String maKichBan) {
        this.maKichBan = maKichBan;
    }

    public String getColorChange() {
        return colorChange;
    }

    public void setColorChange(String colorChange) {
        this.colorChange = colorChange;
    }
}
