package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;

/**
 * A ThongSoMay.
 */
@Entity
@Table(name = "thong_so_may")
public class ThongSoMay implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "ma_thiet_bi")
    private String maThietBi;

    @Column(name = "loai_thiet_bi")
    private String loaiThietBi;

    @Column(name = "hang_tms")
    private Integer hangTms;

    @Column(name = "thong_so")
    private String thongSo;

    @Column(name = "mo_ta")
    private String moTa;

    @Column(name = "trang_thai")
    private String trangThai;

    @Column(name = "phan_loai")
    private String phanLoai;

    @ManyToOne
    @JsonIgnoreProperties(value = { "thongSoMays" }, allowSetters = true)
    private ThietBi thietBi;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ThongSoMay id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMaThietBi() {
        return this.maThietBi;
    }

    public ThongSoMay maThietBi(String maThietBi) {
        this.setMaThietBi(maThietBi);
        return this;
    }

    public void setMaThietBi(String maThietBi) {
        this.maThietBi = maThietBi;
    }

    public String getLoaiThietBi() {
        return this.loaiThietBi;
    }

    public ThongSoMay loaiThietBi(String loaiThietBi) {
        this.setLoaiThietBi(loaiThietBi);
        return this;
    }

    public void setLoaiThietBi(String loaiThietBi) {
        this.loaiThietBi = loaiThietBi;
    }

    public Integer getHangTms() {
        return this.hangTms;
    }

    public ThongSoMay hangTms(Integer hangTms) {
        this.setHangTms(hangTms);
        return this;
    }

    public void setHangTms(Integer hangTms) {
        this.hangTms = hangTms;
    }

    public String getThongSo() {
        return this.thongSo;
    }

    public ThongSoMay thongSo(String thongSo) {
        this.setThongSo(thongSo);
        return this;
    }

    public void setThongSo(String thongSo) {
        this.thongSo = thongSo;
    }

    public String getMoTa() {
        return this.moTa;
    }

    public ThongSoMay moTa(String moTa) {
        this.setMoTa(moTa);
        return this;
    }

    public void setMoTa(String moTa) {
        this.moTa = moTa;
    }

    public String getTrangThai() {
        return this.trangThai;
    }

    public ThongSoMay trangThai(String trangThai) {
        this.setTrangThai(trangThai);
        return this;
    }

    public void setTrangThai(String trangThai) {
        this.trangThai = trangThai;
    }

    public String getPhanLoai() {
        return this.phanLoai;
    }

    public ThongSoMay phanLoai(String phanLoai) {
        this.setPhanLoai(phanLoai);
        return this;
    }

    public void setPhanLoai(String phanLoai) {
        this.phanLoai = phanLoai;
    }

    public ThietBi getThietBi() {
        return this.thietBi;
    }

    public void setThietBi(ThietBi thietBi) {
        this.thietBi = thietBi;
    }

    public ThongSoMay thietBi(ThietBi thietBi) {
        this.setThietBi(thietBi);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ThongSoMay)) {
            return false;
        }
        return id != null && id.equals(((ThongSoMay) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ThongSoMay{" +
            "id=" + getId() +
            ", maThietBi='" + getMaThietBi() + "'" +
            ", loaiThietBi='" + getLoaiThietBi() + "'" +
            ", hangTms=" + getHangTms() +
            ", thongSo='" + getThongSo() + "'" +
            ", moTa='" + getMoTa() + "'" +
            ", trangThai='" + getTrangThai() + "'" +
            ", phanLoai='" + getPhanLoai() + "'" +
            "}";
    }
}
