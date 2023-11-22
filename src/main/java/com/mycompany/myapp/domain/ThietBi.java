package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.persistence.*;

/**
 * A ThietBi.
 */
@Entity
@Table(name = "thiet_bi")
public class ThietBi implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "ma_thiet_bi")
    private String maThietBi;

    @Column(name = "loai_thiet_bi")
    private String loaiThietBi;

    @Column(name = "day_chuyen")
    private String dayChuyen;

    @Column(name = "ngay_tao")
    private ZonedDateTime ngayTao;

    @Column(name = "time_update")
    private ZonedDateTime timeUpdate;

    @Column(name = "update_by")
    private String updateBy;

    @Column(name = "trang_thai")
    private String status;

    @OneToMany(mappedBy = "thietBi")
    @JsonIgnoreProperties(value = { "thietBi" }, allowSetters = true)
    private List<ThongSoMay> thongSoMays;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ThietBi id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMaThietBi() {
        return this.maThietBi;
    }

    public ThietBi maThietBi(String maThietBi) {
        this.setMaThietBi(maThietBi);
        return this;
    }

    public void setMaThietBi(String maThietBi) {
        this.maThietBi = maThietBi;
    }

    public String getLoaiThietBi() {
        return this.loaiThietBi;
    }

    public ThietBi loaiThietBi(String loaiThietBi) {
        this.setLoaiThietBi(loaiThietBi);
        return this;
    }

    public void setLoaiThietBi(String loaiThietBi) {
        this.loaiThietBi = loaiThietBi;
    }

    public String getDayChuyen() {
        return this.dayChuyen;
    }

    public ThietBi dayChuyen(String dayChuyen) {
        this.setDayChuyen(dayChuyen);
        return this;
    }

    public void setDayChuyen(String dayChuyen) {
        this.dayChuyen = dayChuyen;
    }

    public ZonedDateTime getNgayTao() {
        return this.ngayTao;
    }

    public ThietBi ngayTao(ZonedDateTime ngayTao) {
        this.setNgayTao(ngayTao);
        return this;
    }

    public void setNgayTao(ZonedDateTime ngayTao) {
        this.ngayTao = ngayTao;
    }

    public ZonedDateTime getTimeUpdate() {
        return this.timeUpdate;
    }

    public ThietBi timeUpdate(ZonedDateTime timeUpdate) {
        this.setTimeUpdate(timeUpdate);
        return this;
    }

    public void setTimeUpdate(ZonedDateTime timeUpdate) {
        this.timeUpdate = timeUpdate;
    }

    public String getUpdateBy() {
        return this.updateBy;
    }

    public ThietBi updateBy(String updateBy) {
        this.setUpdateBy(updateBy);
        return this;
    }

    public void setUpdateBy(String updateBy) {
        this.updateBy = updateBy;
    }

    public String getStatus() {
        return this.status;
    }

    public ThietBi status(String status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<ThongSoMay> getThongSoMays() {
        return this.thongSoMays;
    }

    public void setThongSoMays(List<ThongSoMay> thongSoMays) {
        if (this.thongSoMays != null) {
            this.thongSoMays.forEach(i -> i.setThietBi(null));
        }
        if (thongSoMays != null) {
            thongSoMays.forEach(i -> i.setThietBi(this));
        }
        this.thongSoMays = thongSoMays;
    }

    public ThietBi thongSoMays(List<ThongSoMay> thongSoMays) {
        this.setThongSoMays(thongSoMays);
        return this;
    }

    public ThietBi addThongSoMay(ThongSoMay thongSoMay) {
        this.thongSoMays.add(thongSoMay);
        thongSoMay.setThietBi(this);
        return this;
    }

    public ThietBi removeThongSoMay(ThongSoMay thongSoMay) {
        this.thongSoMays.remove(thongSoMay);
        thongSoMay.setThietBi(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ThietBi)) {
            return false;
        }
        return id != null && id.equals(((ThietBi) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ThietBi{" +
            "id=" + getId() +
            ", maThietBi='" + getMaThietBi() + "'" +
            ", loaiThietBi='" + getLoaiThietBi() + "'" +
            ", dayChuyen='" + getDayChuyen() + "'" +
            ", ngayTao='" + getNgayTao() + "'" +
            ", timeUpdate='" + getTimeUpdate() + "'" +
            ", updateBy='" + getUpdateBy() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
