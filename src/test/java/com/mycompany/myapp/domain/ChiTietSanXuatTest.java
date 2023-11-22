package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ChiTietSanXuatTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ChiTietSanXuat.class);
        ChiTietSanXuat chiTietSanXuat1 = new ChiTietSanXuat();
        chiTietSanXuat1.setId(1L);
        ChiTietSanXuat chiTietSanXuat2 = new ChiTietSanXuat();
        chiTietSanXuat2.setId(chiTietSanXuat1.getId());
        assertThat(chiTietSanXuat1).isEqualTo(chiTietSanXuat2);
        chiTietSanXuat2.setId(2L);
        assertThat(chiTietSanXuat1).isNotEqualTo(chiTietSanXuat2);
        chiTietSanXuat1.setId(null);
        assertThat(chiTietSanXuat1).isNotEqualTo(chiTietSanXuat2);
    }
}
