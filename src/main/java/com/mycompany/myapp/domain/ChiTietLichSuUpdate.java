package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;

/**
 * A ChiTietLichSuUpdate.
 */
@Entity
@Table(name = "chi_tiet_lich_su_update")
public class ChiTietLichSuUpdate implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "ma_kich_ban")
    private String maKichBan;

    @Column(name = "hang_lssx")
    private Integer hangLssx;

    @Column(name = "thong_so")
    private String thongSo;

    @Column(name = "min_value")
    private Float minValue;

    @Column(name = "max_value")
    private Float maxValue;

    @Column(name = "trungbinh")
    private Float trungbinh;

    @Column(name = "don_vi")
    private String donVi;

    @ManyToOne
    @JsonIgnoreProperties(value = { "chiTietLichSus" }, allowSetters = true)
    private LichSuUpdate lichSuUpdate;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ChiTietLichSuUpdate id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMaKichBan() {
        return this.maKichBan;
    }

    public ChiTietLichSuUpdate maKichBan(String maKichBan) {
        this.setMaKichBan(maKichBan);
        return this;
    }

    public void setMaKichBan(String maKichBan) {
        this.maKichBan = maKichBan;
    }

    public Integer getHangLssx() {
        return this.hangLssx;
    }

    public ChiTietLichSuUpdate hangLssx(Integer hangLssx) {
        this.setHangLssx(hangLssx);
        return this;
    }

    public void setHangLssx(Integer hangLssx) {
        this.hangLssx = hangLssx;
    }

    public String getThongSo() {
        return this.thongSo;
    }

    public ChiTietLichSuUpdate thongSo(String thongSo) {
        this.setThongSo(thongSo);
        return this;
    }

    public void setThongSo(String thongSo) {
        this.thongSo = thongSo;
    }

    public Float getMinValue() {
        return this.minValue;
    }

    public ChiTietLichSuUpdate minValue(Float minValue) {
        this.setMinValue(minValue);
        return this;
    }

    public void setMinValue(Float minValue) {
        this.minValue = minValue;
    }

    public Float getMaxValue() {
        return this.maxValue;
    }

    public ChiTietLichSuUpdate maxValue(Float maxValue) {
        this.setMaxValue(maxValue);
        return this;
    }

    public void setMaxValue(Float maxValue) {
        this.maxValue = maxValue;
    }

    public Float getTrungbinh() {
        return this.trungbinh;
    }

    public ChiTietLichSuUpdate trungbinh(Float trungbinh) {
        this.setTrungbinh(trungbinh);
        return this;
    }

    public void setTrungbinh(Float trungbinh) {
        this.trungbinh = trungbinh;
    }

    public String getDonVi() {
        return this.donVi;
    }

    public ChiTietLichSuUpdate donVi(String donVi) {
        this.setDonVi(donVi);
        return this;
    }

    public void setDonVi(String donVi) {
        this.donVi = donVi;
    }

    public LichSuUpdate getLichSuUpdate() {
        return this.lichSuUpdate;
    }

    public void setLichSuUpdate(LichSuUpdate lichSuUpdate) {
        this.lichSuUpdate = lichSuUpdate;
    }

    public ChiTietLichSuUpdate lichSuUpdate(LichSuUpdate lichSuUpdate) {
        this.setLichSuUpdate(lichSuUpdate);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ChiTietLichSuUpdate)) {
            return false;
        }
        return id != null && id.equals(((ChiTietLichSuUpdate) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ChiTietLichSuUpdate{" +
            "id=" + getId() +
            ", maKichBan='" + getMaKichBan() + "'" +
            ", hangLssx=" + getHangLssx() +
            ", thongSo='" + getThongSo() + "'" +
            ", minValue=" + getMinValue() +
            ", maxValue=" + getMaxValue() +
            ", trungbinh=" + getTrungbinh() +
            ", donVi='" + getDonVi() + "'" +
            "}";
    }
}
