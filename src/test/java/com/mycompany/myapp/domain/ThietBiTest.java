package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ThietBiTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ThietBi.class);
        ThietBi thietBi1 = new ThietBi();
        thietBi1.setId(1L);
        ThietBi thietBi2 = new ThietBi();
        thietBi2.setId(thietBi1.getId());
        assertThat(thietBi1).isEqualTo(thietBi2);
        thietBi2.setId(2L);
        assertThat(thietBi1).isNotEqualTo(thietBi2);
        thietBi1.setId(null);
        assertThat(thietBi1).isNotEqualTo(thietBi2);
    }
}
