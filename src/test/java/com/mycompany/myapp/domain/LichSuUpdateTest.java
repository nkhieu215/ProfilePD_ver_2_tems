package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class LichSuUpdateTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LichSuUpdate.class);
        LichSuUpdate lichSuUpdate1 = new LichSuUpdate();
        lichSuUpdate1.setId(1L);
        LichSuUpdate lichSuUpdate2 = new LichSuUpdate();
        lichSuUpdate2.setId(lichSuUpdate1.getId());
        assertThat(lichSuUpdate1).isEqualTo(lichSuUpdate2);
        lichSuUpdate2.setId(2L);
        assertThat(lichSuUpdate1).isNotEqualTo(lichSuUpdate2);
        lichSuUpdate1.setId(null);
        assertThat(lichSuUpdate1).isNotEqualTo(lichSuUpdate2);
    }
}
