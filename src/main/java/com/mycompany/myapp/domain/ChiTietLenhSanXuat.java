package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.ZonedDateTime;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A ChiTietLenhSanXuat.
 */
@Entity
@Table(name = "chi_tiet_lenh_san_xuat")
public class ChiTietLenhSanXuat implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "reel_id", nullable = false)
    private String reelID;

    @NotNull
    @Column(name = "part_number", nullable = false)
    private String partNumber;

    @NotNull
    @Column(name = "vendor", nullable = false)
    private String vendor;

    @NotNull
    @Column(name = "lot", nullable = false)
    private String lot;

    @NotNull
    @Column(name = "user_data_1", nullable = false)
    private String userData1;

    @NotNull
    @Column(name = "user_data_2", nullable = false)
    private String userData2;

    @NotNull
    @Column(name = "user_data_3", nullable = false)
    private String userData3;

    @NotNull
    @Column(name = "user_data_4", nullable = false)
    private String userData4;

    @NotNull
    @Column(name = "user_data_5", nullable = false)
    private String userData5;

    @NotNull
    @Column(name = "initial_quantity", nullable = false)
    private Integer initialQuantity;

    @Column(name = "msd_level")
    private String msdLevel;

    @Column(name = "msd_initial_floor_time")
    private String msdInitialFloorTime;

    @Column(name = "msd_bag_seal_date")
    private String msdBagSealDate;

    @Column(name = "market_usage")
    private String marketUsage;

    @NotNull
    @Column(name = "quantity_override", nullable = false)
    private Integer quantityOverride;

    @Column(name = "shelf_time")
    private String shelfTime;

    @Column(name = "sp_material_name")
    private String spMaterialName;

    @Column(name = "warning_limit")
    private String warningLimit;

    @Column(name = "maximum_limit")
    private String maximumLimit;

    @Column(name = "comments")
    private String comments;

    @Column(name = "warmup_time")
    private String warmupTime;

    @NotNull
    @Column(name = "storage_unit", nullable = false)
    private String storageUnit;

    @Column(name = "sub_storage_unit")
    private String subStorageUnit;

    @Column(name = "location_override")
    private String locationOverride;

    @NotNull
    @Column(name = "expiration_date", nullable = false)
    private String expirationDate;

    @NotNull
    @Column(name = "manufacturing_date", nullable = false)
    private String manufacturingDate;

    @Column(name = "part_class")
    private String partClass;

    @Column(name = "sap_code")
    private String sapCode;

    @Column(name = "trang_thai")
    private String trangThai;

    @Column(name = "checked")
    private Integer checked;

    @ManyToOne
    @JsonIgnoreProperties(value = { "chiTietLenhSanXuats" }, allowSetters = true)
    private LenhSanXuat lenhSanXuat;

    public ChiTietLenhSanXuat() {}

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ChiTietLenhSanXuat id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReelID() {
        return reelID;
    }

    public void setReelID(String reelID) {
        this.reelID = reelID;
    }

    public ChiTietLenhSanXuat reelID(String reelID) {
        this.setReelID(reelID);
        return this;
    }

    public String getPartNumber() {
        return this.partNumber;
    }

    public ChiTietLenhSanXuat partNumber(String partNumber) {
        this.setPartNumber(partNumber);
        return this;
    }

    public void setPartNumber(String partNumber) {
        this.partNumber = partNumber;
    }

    public String getVendor() {
        return this.vendor;
    }

    public ChiTietLenhSanXuat vendor(String vendor) {
        this.setVendor(vendor);
        return this;
    }

    public void setVendor(String vendor) {
        this.vendor = vendor;
    }

    public String getLot() {
        return this.lot;
    }

    public ChiTietLenhSanXuat lot(String lot) {
        this.setLot(lot);
        return this;
    }

    public void setLot(String lot) {
        this.lot = lot;
    }

    public String getUserData1() {
        return this.userData1;
    }

    public ChiTietLenhSanXuat userData1(String userData1) {
        this.setUserData1(userData1);
        return this;
    }

    public void setUserData1(String userData1) {
        this.userData1 = userData1;
    }

    public String getUserData2() {
        return this.userData2;
    }

    public ChiTietLenhSanXuat userData2(String userData2) {
        this.setUserData2(userData2);
        return this;
    }

    public void setUserData2(String userData2) {
        this.userData2 = userData2;
    }

    public String getUserData3() {
        return this.userData3;
    }

    public ChiTietLenhSanXuat userData3(String userData3) {
        this.setUserData3(userData3);
        return this;
    }

    public void setUserData3(String userData3) {
        this.userData3 = userData3;
    }

    public String getUserData4() {
        return userData4;
    }

    public void setUserData4(String userData4) {
        this.userData4 = userData4;
    }

    public ChiTietLenhSanXuat userData4(String userData4) {
        this.setUserData4(userData4);
        return this;
    }

    public String getUserData5() {
        return userData5;
    }

    public void setUserData5(String userData5) {
        this.userData5 = userData5;
    }

    public ChiTietLenhSanXuat userData5(String userData5) {
        this.setUserData5(userData5);
        return this;
    }

    public Integer getInitialQuantity() {
        return this.initialQuantity;
    }

    public ChiTietLenhSanXuat initialQuantity(Integer initialQuantity) {
        this.setInitialQuantity(initialQuantity);
        return this;
    }

    public void setInitialQuantity(Integer initialQuantity) {
        this.initialQuantity = initialQuantity;
    }

    public String getMsdLevel() {
        return this.msdLevel;
    }

    public ChiTietLenhSanXuat msdLevel(String msdLevel) {
        this.setMsdLevel(msdLevel);
        return this;
    }

    public void setMsdLevel(String msdLevel) {
        this.msdLevel = msdLevel;
    }

    public String getMsdInitialFloorTime() {
        return this.msdInitialFloorTime;
    }

    public ChiTietLenhSanXuat msdInitialFloorTime(String msdInitialFloorTime) {
        this.setMsdInitialFloorTime(msdInitialFloorTime);
        return this;
    }

    public void setMsdInitialFloorTime(String msdInitialFloorTime) {
        this.msdInitialFloorTime = msdInitialFloorTime;
    }

    public String getMsdBagSealDate() {
        return this.msdBagSealDate;
    }

    public ChiTietLenhSanXuat msdBagSealDate(String msdBagSealDate) {
        this.setMsdBagSealDate(msdBagSealDate);
        return this;
    }

    public void setMsdBagSealDate(String msdBagSealDate) {
        this.msdBagSealDate = msdBagSealDate;
    }

    public String getMarketUsage() {
        return this.marketUsage;
    }

    public ChiTietLenhSanXuat marketUsage(String marketUsage) {
        this.setMarketUsage(marketUsage);
        return this;
    }

    public void setMarketUsage(String marketUsage) {
        this.marketUsage = marketUsage;
    }

    public Integer getQuantityOverride() {
        return this.quantityOverride;
    }

    public ChiTietLenhSanXuat quantityOverride(Integer quantityOverride) {
        this.setQuantityOverride(quantityOverride);
        return this;
    }

    public void setQuantityOverride(Integer quantityOverride) {
        this.quantityOverride = quantityOverride;
    }

    public String getShelfTime() {
        return this.shelfTime;
    }

    public ChiTietLenhSanXuat shelfTime(String shelfTime) {
        this.setShelfTime(shelfTime);
        return this;
    }

    public void setShelfTime(String shelfTime) {
        this.shelfTime = shelfTime;
    }

    public String getSpMaterialName() {
        return this.spMaterialName;
    }

    public ChiTietLenhSanXuat spMaterialName(String spMaterialName) {
        this.setSpMaterialName(spMaterialName);
        return this;
    }

    public void setSpMaterialName(String spMaterialName) {
        this.spMaterialName = spMaterialName;
    }

    public String getWarningLimit() {
        return this.warningLimit;
    }

    public ChiTietLenhSanXuat warningLimit(String warningLimit) {
        this.setWarningLimit(warningLimit);
        return this;
    }

    public void setWarningLimit(String warningLimit) {
        this.warningLimit = warningLimit;
    }

    public String getMaximumLimit() {
        return this.maximumLimit;
    }

    public ChiTietLenhSanXuat maximumLimit(String maximumLimit) {
        this.setMaximumLimit(maximumLimit);
        return this;
    }

    public void setMaximumLimit(String maximumLimit) {
        this.maximumLimit = maximumLimit;
    }

    public String getComments() {
        return this.comments;
    }

    public ChiTietLenhSanXuat comments(String comments) {
        this.setComments(comments);
        return this;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getWarmupTime() {
        return warmupTime;
    }

    public void setWarmupTime(String warmupTime) {
        this.warmupTime = warmupTime;
    }

    public ChiTietLenhSanXuat warmupTime(String warmupTime) {
        this.setWarmupTime(warmupTime);
        return this;
    }

    public String getStorageUnit() {
        return this.storageUnit;
    }

    public ChiTietLenhSanXuat storageUnit(String storageUnit) {
        this.setStorageUnit(storageUnit);
        return this;
    }

    public void setStorageUnit(String storageUnit) {
        this.storageUnit = storageUnit;
    }

    public String getSubStorageUnit() {
        return this.subStorageUnit;
    }

    public ChiTietLenhSanXuat subStorageUnit(String subStorageUnit) {
        this.setSubStorageUnit(subStorageUnit);
        return this;
    }

    public void setSubStorageUnit(String subStorageUnit) {
        this.subStorageUnit = subStorageUnit;
    }

    public String getLocationOverride() {
        return this.locationOverride;
    }

    public ChiTietLenhSanXuat locationOverride(String locationOverride) {
        this.setLocationOverride(locationOverride);
        return this;
    }

    public void setLocationOverride(String locationOverride) {
        this.locationOverride = locationOverride;
    }

    public String getExpirationDate() {
        return this.expirationDate;
    }

    public ChiTietLenhSanXuat expirationDate(String expirationDate) {
        this.setExpirationDate(expirationDate);
        return this;
    }

    public void setExpirationDate(String expirationDate) {
        this.expirationDate = expirationDate;
    }

    public String getManufacturingDate() {
        return this.manufacturingDate;
    }

    public ChiTietLenhSanXuat manufacturingDate(String manufacturingDate) {
        this.setManufacturingDate(manufacturingDate);
        return this;
    }

    public void setManufacturingDate(String manufacturingDate) {
        this.manufacturingDate = manufacturingDate;
    }

    public String getPartClass() {
        return this.partClass;
    }

    public ChiTietLenhSanXuat partClass(String partClass) {
        this.setPartClass(partClass);
        return this;
    }

    public void setPartClass(String partClass) {
        this.partClass = partClass;
    }

    public String getSapCode() {
        return sapCode;
    }

    public void setSapCode(String sapCode) {
        this.sapCode = sapCode;
    }

    public ChiTietLenhSanXuat sapCode(String sapCode) {
        this.setSapCode(sapCode);
        return this;
    }

    public String getTrangThai() {
        return this.trangThai;
    }

    public ChiTietLenhSanXuat trangThai(String trangThai) {
        this.setTrangThai(trangThai);
        return this;
    }

    public void setTrangThai(String trangThai) {
        this.trangThai = trangThai;
    }

    public Integer getChecked() {
        return this.checked;
    }

    public ChiTietLenhSanXuat checked(Integer checked) {
        this.setChecked(checked);
        return this;
    }

    public void setChecked(Integer checked) {
        this.checked = checked;
    }

    public LenhSanXuat getLenhSanXuat() {
        return this.lenhSanXuat;
    }

    public void setLenhSanXuat(LenhSanXuat lenhSanXuat) {
        this.lenhSanXuat = lenhSanXuat;
    }

    public ChiTietLenhSanXuat lenhSanXuat(LenhSanXuat lenhSanXuat) {
        this.setLenhSanXuat(lenhSanXuat);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ChiTietLenhSanXuat)) {
            return false;
        }
        return id != null && id.equals(((ChiTietLenhSanXuat) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ChiTietLenhSanXuat{" +
            "id=" + getId() +
            ", reelID=" + getReelID() +
            ", partNumber='" + getPartNumber() + "'" +
            ", vendor='" + getVendor() + "'" +
            ", lot='" + getLot() + "'" +
            ", userData1='" + getUserData1() + "'" +
            ", userData2='" + getUserData2() + "'" +
            ", userData3='" + getUserData3() + "'" +
            ", userData4=" + getUserData4() +
            ", userData5=" + getUserData5() +
            ", initialQuantity=" + getInitialQuantity() +
            ", msdLevel='" + getMsdLevel() + "'" +
            ", msdInitialFloorTime='" + getMsdInitialFloorTime() + "'" +
            ", msdBagSealDate='" + getMsdBagSealDate() + "'" +
            ", marketUsage='" + getMarketUsage() + "'" +
            ", quantityOverride=" + getQuantityOverride() +
            ", shelfTime='" + getShelfTime() + "'" +
            ", spMaterialName='" + getSpMaterialName() + "'" +
            ", warningLimit='" + getWarningLimit() + "'" +
            ", maximumLimit='" + getMaximumLimit() + "'" +
            ", comments='" + getComments() + "'" +
            ", warmupTime='" + getWarmupTime() + "'" +
            ", storageUnit='" + getStorageUnit() + "'" +
            ", subStorageUnit='" + getSubStorageUnit() + "'" +
            ", locationOverride='" + getLocationOverride() + "'" +
            ", expirationDate='" + getExpirationDate() + "'" +
            ", manufacturingDate='" + getManufacturingDate() + "'" +
            ", partClass='" + getPartClass() + "'" +
            ", sapCode=" + getSapCode() +
            ", trangThai='" + getTrangThai() + "'" +
            ", checked=" + getChecked() +
            "}";
    }
}
