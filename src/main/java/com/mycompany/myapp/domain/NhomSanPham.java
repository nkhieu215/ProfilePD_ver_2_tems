package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;

/**
 * A NhomSanPham.
 */
@Entity
@Table(name = "nhom_san_pham")
public class NhomSanPham implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "ma_san_pham")
    private String maSanPham;

    @Column(name = "nhom_san_pham")
    private String nhomSanPham;

    //    @ManyToOne
    //    @JsonIgnoreProperties(value = { "chiTietKichBans", "nhomSanPhams" }, allowSetters = true)
    //    private KichBan kichBan;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public NhomSanPham id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMaSanPham() {
        return this.maSanPham;
    }

    public NhomSanPham maSanPham(String maSanPham) {
        this.setMaSanPham(maSanPham);
        return this;
    }

    public void setMaSanPham(String maSanPham) {
        this.maSanPham = maSanPham;
    }

    public String getNhomSanPham() {
        return this.nhomSanPham;
    }

    public NhomSanPham nhomSanPham(String nhomSanPham) {
        this.setNhomSanPham(nhomSanPham);
        return this;
    }

    public void setNhomSanPham(String nhomSanPham) {
        this.nhomSanPham = nhomSanPham;
    }

    //    public KichBan getKichBan() {
    //        return this.kichBan;
    //    }
    //
    //    public void setKichBan(KichBan kichBan) {
    //        this.kichBan = kichBan;
    //    }

    //    public NhomSanPham kichBan(KichBan kichBan) {
    //        this.setKichBan(kichBan);
    //        return this;
    //    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NhomSanPham)) {
            return false;
        }
        return id != null && id.equals(((NhomSanPham) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "NhomSanPham{" +
            "id=" + getId() +
            ", maSanPham='" + getMaSanPham() + "'" +
            ", nhomSanPham='" + getNhomSanPham() + "'" +
            "}";
    }
}
