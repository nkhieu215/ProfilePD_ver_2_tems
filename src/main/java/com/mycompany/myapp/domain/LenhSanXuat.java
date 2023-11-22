package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A LenhSanXuat.
 */
@Entity
@Table(name = "lenh_san_xuat")
public class LenhSanXuat implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "ma_lenh_san_xuat", nullable = false, unique = true)
    private String maLenhSanXuat;

    @Column(name = "sap_code")
    private String sapCode;

    @Column(name = "sap_name")
    private String sapName;

    @Column(name = "work_order_code")
    private String workOrderCode;

    @Column(name = "version")
    private String version;

    @Column(name = "storage_code")
    private String storageCode;

    @Column(name = "total_quantity")
    private String totalQuantity;

    @Column(name = "create_by")
    private String createBy;

    @Column(name = "entry_time")
    private String entryTime;

    @Column(name = "trang_thai")
    private String trangThai;

    @Column(name = "comment")
    private String comment;

    @OneToMany(mappedBy = "lenhSanXuat")
    @JsonIgnoreProperties(value = { "lenhSanXuat" }, allowSetters = true)
    private Set<ChiTietLenhSanXuat> chiTietLenhSanXuats = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public LenhSanXuat id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMaLenhSanXuat() {
        return maLenhSanXuat;
    }

    public void setMaLenhSanXuat(String maLenhSanXuat) {
        this.maLenhSanXuat = maLenhSanXuat;
    }

    public LenhSanXuat maLenhSanXuat(String maLenhSanXuat) {
        this.setMaLenhSanXuat(maLenhSanXuat);
        return this;
    }

    public String getSapCode() {
        return this.sapCode;
    }

    public LenhSanXuat sapCode(String sapCode) {
        this.setSapCode(sapCode);
        return this;
    }

    public void setSapCode(String sapCode) {
        this.sapCode = sapCode;
    }

    public String getSapName() {
        return this.sapName;
    }

    public LenhSanXuat sapName(String sapName) {
        this.setSapName(sapName);
        return this;
    }

    public void setSapName(String sapName) {
        this.sapName = sapName;
    }

    public String getWorkOrderCode() {
        return this.workOrderCode;
    }

    public LenhSanXuat workOrderCode(String workOrderCode) {
        this.setWorkOrderCode(workOrderCode);
        return this;
    }

    public void setWorkOrderCode(String workOrderCode) {
        this.workOrderCode = workOrderCode;
    }

    public String getVersion() {
        return this.version;
    }

    public LenhSanXuat version(String version) {
        this.setVersion(version);
        return this;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getStorageCode() {
        return this.storageCode;
    }

    public LenhSanXuat storageCode(String storageCode) {
        this.setStorageCode(storageCode);
        return this;
    }

    public void setStorageCode(String storageCode) {
        this.storageCode = storageCode;
    }

    public String getTotalQuantity() {
        return this.totalQuantity;
    }

    public LenhSanXuat totalQuantity(String totalQuantity) {
        this.setTotalQuantity(totalQuantity);
        return this;
    }

    public void setTotalQuantity(String totalQuantity) {
        this.totalQuantity = totalQuantity;
    }

    public String getCreateBy() {
        return this.createBy;
    }

    public LenhSanXuat createBy(String createBy) {
        this.setCreateBy(createBy);
        return this;
    }

    public void setCreateBy(String createBy) {
        this.createBy = createBy;
    }

    public String getEntryTime() {
        return this.entryTime;
    }

    public LenhSanXuat entryTime(String entryTime) {
        this.setEntryTime(entryTime);
        return this;
    }

    public void setEntryTime(String entryTime) {
        this.entryTime = entryTime;
    }

    public String getTrangThai() {
        return this.trangThai;
    }

    public LenhSanXuat trangThai(String trangThai) {
        this.setTrangThai(trangThai);
        return this;
    }

    public void setTrangThai(String trangThai) {
        this.trangThai = trangThai;
    }

    public String getComment() {
        return this.comment;
    }

    public LenhSanXuat comment(String comment) {
        this.setComment(comment);
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Set<ChiTietLenhSanXuat> getChiTietLenhSanXuats() {
        return this.chiTietLenhSanXuats;
    }

    public void setChiTietLenhSanXuats(Set<ChiTietLenhSanXuat> chiTietLenhSanXuats) {
        if (this.chiTietLenhSanXuats != null) {
            this.chiTietLenhSanXuats.forEach(i -> i.setLenhSanXuat(null));
        }
        if (chiTietLenhSanXuats != null) {
            chiTietLenhSanXuats.forEach(i -> i.setLenhSanXuat(this));
        }
        this.chiTietLenhSanXuats = chiTietLenhSanXuats;
    }

    public LenhSanXuat chiTietLenhSanXuats(Set<ChiTietLenhSanXuat> chiTietLenhSanXuats) {
        this.setChiTietLenhSanXuats(chiTietLenhSanXuats);
        return this;
    }

    public LenhSanXuat addChiTietLenhSanXuat(ChiTietLenhSanXuat chiTietLenhSanXuat) {
        this.chiTietLenhSanXuats.add(chiTietLenhSanXuat);
        chiTietLenhSanXuat.setLenhSanXuat(this);
        return this;
    }

    public LenhSanXuat removeChiTietLenhSanXuat(ChiTietLenhSanXuat chiTietLenhSanXuat) {
        this.chiTietLenhSanXuats.remove(chiTietLenhSanXuat);
        chiTietLenhSanXuat.setLenhSanXuat(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LenhSanXuat)) {
            return false;
        }
        return id != null && id.equals(((LenhSanXuat) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LenhSanXuat{" +
            "id=" + getId() +
            ", maLenhSanXuat=" + getMaLenhSanXuat() +
            ", sapCode='" + getSapCode() + "'" +
            ", sapName='" + getSapName() + "'" +
            ", workOrderCode='" + getWorkOrderCode() + "'" +
            ", version='" + getVersion() + "'" +
            ", storageCode='" + getStorageCode() + "'" +
            ", totalQuantity='" + getTotalQuantity() + "'" +
            ", createBy='" + getCreateBy() + "'" +
            ", entryTime='" + getEntryTime() + "'" +
            ", trangThai='" + getTrangThai() + "'" +
            ", comment='" + getComment() + "'" +
            "}";
    }
}
