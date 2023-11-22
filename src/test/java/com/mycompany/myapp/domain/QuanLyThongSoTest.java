package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class QuanLyThongSoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(QuanLyThongSo.class);
        QuanLyThongSo quanLyThongSo1 = new QuanLyThongSo();
        quanLyThongSo1.setId(1L);
        QuanLyThongSo quanLyThongSo2 = new QuanLyThongSo();
        quanLyThongSo2.setId(quanLyThongSo1.getId());
        assertThat(quanLyThongSo1).isEqualTo(quanLyThongSo2);
        quanLyThongSo2.setId(2L);
        assertThat(quanLyThongSo1).isNotEqualTo(quanLyThongSo2);
        quanLyThongSo1.setId(null);
        assertThat(quanLyThongSo1).isNotEqualTo(quanLyThongSo2);
    }
}
