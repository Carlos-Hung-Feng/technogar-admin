/**
 * credit-note-application controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::credit-note-application.credit-note-application',
  ({ strapi }) => ({
    async apply(ctx) {
      const { creditNoteId, invoiceId, amount } = ctx.request.body;

      if (!creditNoteId || !invoiceId || !amount) {
        return ctx.badRequest("Faltan datos");
      }

      // 🔹 1. Buscar la nota de crédito
      const creditNote = await strapi.entityService.findOne(
        'api::credit-note.credit-note',
        creditNoteId
      );

      if (!creditNote) {
        return ctx.notFound("Nota de crédito no encontrada");
      }

      // 🔹 2. Validar monto disponible
      if (amount > creditNote.RemainingAmount) {
        return ctx.badRequest(
          `Monto excede lo disponible (${creditNote.RemainingAmount})`
        );
      }

      // 🔥 3. Transacción (MUY recomendado)
      const result = await strapi.db.connection.transaction(async (trx) => {
        // Crear application
        const application = await strapi.entityService.create(
          'api::credit-note-application.credit-note-application',
          {
            data: {
              Credit_Note: creditNoteId,
              Invoice: invoiceId,
              AppliedAmount: amount,
              publishedAt: new Date(), // 🔥 esto lo publica
            },
            transacting: trx,
          }
        );

        // Actualizar RemainingAmount
        await strapi.entityService.update(
          'api::credit-note.credit-note',
          creditNoteId,
          {
            data: {
              RemainingAmount: creditNote.RemainingAmount - amount,
            },
            transacting: trx,
          }
        );

        return application;
      });

      return {
        message: "Nota de crédito aplicada correctamente",
        data: result,
      };
    },
  })
);