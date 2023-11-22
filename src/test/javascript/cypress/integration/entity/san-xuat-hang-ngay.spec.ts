import { entityItemSelector } from '../../support/commands';
import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('SanXuatHangNgay e2e test', () => {
  const sanXuatHangNgayPageUrl = '/san-xuat-hang-ngay';
  const sanXuatHangNgayPageUrlPattern = new RegExp('/san-xuat-hang-ngay(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const sanXuatHangNgaySample = {};

  let sanXuatHangNgay: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/san-xuat-hang-ngays+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/san-xuat-hang-ngays').as('postEntityRequest');
    cy.intercept('DELETE', '/api/san-xuat-hang-ngays/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (sanXuatHangNgay) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/san-xuat-hang-ngays/${sanXuatHangNgay.id}`,
      }).then(() => {
        sanXuatHangNgay = undefined;
      });
    }
  });

  it('SanXuatHangNgays menu should load SanXuatHangNgays page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('san-xuat-hang-ngay');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('SanXuatHangNgay').should('exist');
    cy.url().should('match', sanXuatHangNgayPageUrlPattern);
  });

  describe('SanXuatHangNgay page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(sanXuatHangNgayPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create SanXuatHangNgay page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/san-xuat-hang-ngay/new$'));
        cy.getEntityCreateUpdateHeading('SanXuatHangNgay');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', sanXuatHangNgayPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/san-xuat-hang-ngays',
          body: sanXuatHangNgaySample,
        }).then(({ body }) => {
          sanXuatHangNgay = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/san-xuat-hang-ngays+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/san-xuat-hang-ngays?page=0&size=20>; rel="last",<http://localhost/api/san-xuat-hang-ngays?page=0&size=20>; rel="first"',
              },
              body: [sanXuatHangNgay],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(sanXuatHangNgayPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details SanXuatHangNgay page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('sanXuatHangNgay');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', sanXuatHangNgayPageUrlPattern);
      });

      it('edit button click should load edit SanXuatHangNgay page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('SanXuatHangNgay');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', sanXuatHangNgayPageUrlPattern);
      });

      it('last delete button click should delete instance of SanXuatHangNgay', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('sanXuatHangNgay').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', sanXuatHangNgayPageUrlPattern);

        sanXuatHangNgay = undefined;
      });
    });
  });

  describe('new SanXuatHangNgay page', () => {
    beforeEach(() => {
      cy.visit(`${sanXuatHangNgayPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('SanXuatHangNgay');
    });

    it('should create an instance of SanXuatHangNgay', () => {
      cy.get(`[data-cy="maKichBan"]`).type('withdrawal').should('have.value', 'withdrawal');

      cy.get(`[data-cy="maThietBi"]`).type('implement granular').should('have.value', 'implement granular');

      cy.get(`[data-cy="loaiThietBi"]`).type('South interface Berkshire').should('have.value', 'South interface Berkshire');

      cy.get(`[data-cy="dayChuyen"]`).type('Rubber').should('have.value', 'Rubber');

      cy.get(`[data-cy="maSanPham"]`).type('e-markets Auto interactive').should('have.value', 'e-markets Auto interactive');

      cy.get(`[data-cy="versionSanPham"]`).type('Incredible Chicken').should('have.value', 'Incredible Chicken');

      cy.get(`[data-cy="ngayTao"]`).type('2023-10-16T19:50').should('have.value', '2023-10-16T19:50');

      cy.get(`[data-cy="timeUpdate"]`).type('2023-10-16T16:29').should('have.value', '2023-10-16T16:29');

      cy.get(`[data-cy="trangThai"]`).type('Total').should('have.value', 'Total');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        sanXuatHangNgay = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', sanXuatHangNgayPageUrlPattern);
    });
  });
});
