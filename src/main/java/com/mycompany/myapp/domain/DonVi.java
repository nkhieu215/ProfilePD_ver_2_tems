package com.mycompany.myapp.domain;

import javax.persistence.*;

@Entity
@Table(name = "don_vi")
public class DonVi {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ten_don_vi")
    private String donVi;

    public DonVi(Long id, String donVi) {
        this.id = id;
        this.donVi = donVi;
    }

    public DonVi() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDonVi() {
        return donVi;
    }

    public void setDonVi(String donVi) {
        this.donVi = donVi;
    }
}
