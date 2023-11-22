package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class SanXuatHangNgayTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SanXuatHangNgay.class);
        SanXuatHangNgay sanXuatHangNgay1 = new SanXuatHangNgay();
        sanXuatHangNgay1.setId(1L);
        SanXuatHangNgay sanXuatHangNgay2 = new SanXuatHangNgay();
        sanXuatHangNgay2.setId(sanXuatHangNgay1.getId());
        assertThat(sanXuatHangNgay1).isEqualTo(sanXuatHangNgay2);
        sanXuatHangNgay2.setId(2L);
        assertThat(sanXuatHangNgay1).isNotEqualTo(sanXuatHangNgay2);
        sanXuatHangNgay1.setId(null);
        assertThat(sanXuatHangNgay1).isNotEqualTo(sanXuatHangNgay2);
    }
}
