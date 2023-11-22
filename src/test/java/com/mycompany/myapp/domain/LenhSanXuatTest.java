package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class LenhSanXuatTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LenhSanXuat.class);
        LenhSanXuat lenhSanXuat1 = new LenhSanXuat();
        lenhSanXuat1.setId(1L);
        LenhSanXuat lenhSanXuat2 = new LenhSanXuat();
        lenhSanXuat2.setId(lenhSanXuat1.getId());
        assertThat(lenhSanXuat1).isEqualTo(lenhSanXuat2);
        lenhSanXuat2.setId(2L);
        assertThat(lenhSanXuat1).isNotEqualTo(lenhSanXuat2);
        lenhSanXuat1.setId(null);
        assertThat(lenhSanXuat1).isNotEqualTo(lenhSanXuat2);
    }
}
