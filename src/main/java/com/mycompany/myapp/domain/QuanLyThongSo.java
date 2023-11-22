package com.mycompany.myapp.domain;

import java.io.Serializable;
import java.time.ZonedDateTime;
import javax.persistence.*;

/**
 * A QuanLyThongSo.
 */
@Entity
@Table(name = "quan_ly_thong_so")
public class QuanLyThongSo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "ma_thong_so")
    private String maThongSo;

    @Column(name = "ten_thong_so")
    private String tenThongSo;

    @Column(name = "mo_ta")
    private String moTa;

    @Column(name = "ngay_tao")
    private ZonedDateTime ngayTao;

    @Column(name = "ngay_update")
    private ZonedDateTime ngayUpdate;

    @Column(name = "update_by")
    private String updateBy;

    @Column(name = "status")
    private String status;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public QuanLyThongSo id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMaThongSo() {
        return this.maThongSo;
    }

    public QuanLyThongSo maThongSo(String maThongSo) {
        this.setMaThongSo(maThongSo);
        return this;
    }

    public void setMaThongSo(String maThongSo) {
        this.maThongSo = maThongSo;
    }

    public String getTenThongSo() {
        return this.tenThongSo;
    }

    public QuanLyThongSo tenThongSo(String tenThongSo) {
        this.setTenThongSo(tenThongSo);
        return this;
    }

    public void setTenThongSo(String tenThongSo) {
        this.tenThongSo = tenThongSo;
    }

    public String getMoTa() {
        return this.moTa;
    }

    public QuanLyThongSo moTa(String moTa) {
        this.setMoTa(moTa);
        return this;
    }

    public void setMoTa(String moTa) {
        this.moTa = moTa;
    }

    public ZonedDateTime getNgayTao() {
        return this.ngayTao;
    }

    public QuanLyThongSo ngayTao(ZonedDateTime ngayTao) {
        this.setNgayTao(ngayTao);
        return this;
    }

    public void setNgayTao(ZonedDateTime ngayTao) {
        this.ngayTao = ngayTao;
    }

    public ZonedDateTime getNgayUpdate() {
        return this.ngayUpdate;
    }

    public QuanLyThongSo ngayUpdate(ZonedDateTime ngayUpdate) {
        this.setNgayUpdate(ngayUpdate);
        return this;
    }

    public void setNgayUpdate(ZonedDateTime ngayUpdate) {
        this.ngayUpdate = ngayUpdate;
    }

    public String getUpdateBy() {
        return this.updateBy;
    }

    public QuanLyThongSo updateBy(String updateBy) {
        this.setUpdateBy(updateBy);
        return this;
    }

    public void setUpdateBy(String updateBy) {
        this.updateBy = updateBy;
    }

    public String getStatus() {
        return this.status;
    }

    public QuanLyThongSo status(String status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof QuanLyThongSo)) {
            return false;
        }
        return id != null && id.equals(((QuanLyThongSo) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "QuanLyThongSo{" +
            "id=" + getId() +
            ", maThongSo='" + getMaThongSo() + "'" +
            ", tenThongSo='" + getTenThongSo() + "'" +
            ", moTa='" + getMoTa() + "'" +
            ", ngayTao='" + getNgayTao() + "'" +
            ", ngayUpdate='" + getNgayUpdate() + "'" +
            ", updateBy='" + getUpdateBy() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
