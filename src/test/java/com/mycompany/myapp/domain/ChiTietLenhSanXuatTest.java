package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ChiTietLenhSanXuatTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ChiTietLenhSanXuat.class);
        ChiTietLenhSanXuat chiTietLenhSanXuat1 = new ChiTietLenhSanXuat();
        chiTietLenhSanXuat1.setId(1L);
        ChiTietLenhSanXuat chiTietLenhSanXuat2 = new ChiTietLenhSanXuat();
        chiTietLenhSanXuat2.setId(chiTietLenhSanXuat1.getId());
        assertThat(chiTietLenhSanXuat1).isEqualTo(chiTietLenhSanXuat2);
        chiTietLenhSanXuat2.setId(2L);
        assertThat(chiTietLenhSanXuat1).isNotEqualTo(chiTietLenhSanXuat2);
        chiTietLenhSanXuat1.setId(null);
        assertThat(chiTietLenhSanXuat1).isNotEqualTo(chiTietLenhSanXuat2);
    }
}
