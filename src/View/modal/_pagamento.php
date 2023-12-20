<form id="form_pagamento_os">
<div class="modal fade" id="createpayment" tabindex="-1" aria-labelledby="createpayment" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Criar Pagamento </h5></br><label for="">Numero da OS:</label><span id="OsID"></span>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-lg-6 col-sm-12 col-12">
                        <div class="form-group">
                            <label>Data do pagamento</label>
                            <input type="hidden" id="OsID">
                            <input type="hidden" id="TotalGeral">
                            <div class="input-groupicon">
                                <input id="data_pagamento" type="text" value="<?= date("d/m/Y") ?>" class="datetimepicker">
                                <div class="addonset">
                                    <img src="../Template/assets/img/icons/calendars.svg" alt="img">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-sm-12 col-12">
                        <div class="form-group">
                            <label>Data do Vencimento</label>
                            <div class="input-groupicon">
                                <input id="data_vencimento" type="text" value="<?= date("d/m/Y") ?>" class="datetimepicker">
                                <div class="addonset">
                                    <img src="../Template/assets/img/icons/calendars.svg" alt="img">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="divValorPago" class="col-lg-6 col-sm-12 col-12">
                        <div class="form-group">
                            <label>Valor Pago</label>
                            <input class="" type="text" id="valor_pago" value="0.00">
                        </div>
                    </div>
                    <div class="col-lg-6 col-sm-12 col-12">
                        <div class="form-group">
                            <label>Desconto</label>
                            <input class="" type="text" id="valor_desconto" value="0.00">
                        </div>
                    </div>
                    <div id="divQtdParcela" class="col-lg-12 col-sm-12 col-12" style="display:none">
                        <div class="form-group">
                            <label>Quantidade de parcela</label>
                            <select id="qtd_parcela" class="select">
                                <option value="0">selecione a quantidade de parcela</option>
                                <option value="1">1 vez</option>
                                <option value="2">2 vezes</option>
                                <option value="3">3 vezes</option>
                                <option value="4">4 vezes</option>
                                <option value="5">5 vezes</option>
                                <option value="6">6 vezes</option>
                                <option value="7">7 vezes</option>
                                <option value="8">8 vezes</option>
                                <option value="9">9 vezes</option>
                                <option value="10">10 vezes</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-12 col-sm-12 col-12">
                        <div class="form-group">
                            <label>Tipo de pagamento</label>
                            <select onchange="HabilitaParcelas(this.value)" id="tipo_pagamento" class="select">
                                <option value="1">Dinheiro</option>
                                <option value="2">PIX</option>
                                <option value="3">Cartão Débito</option>
                                <option value="4">Cartão Credito</option>
                                <option value="5">Venda à Prazo</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="form-group mb-0">
                            <label>Observação</label>
                            <textarea id="observacao" class="form-control"></textarea>
                        </div>
                    </div>
                </div>
                <div class="row">

                    <div class="col-lg-12 ">
                        <div class="total-order w-100 max-widthauto m-auto mb-4">
                            <ul>
                                <li>
                                    <h4>Valor Total</h4>
                                    <h5 class="money" id="valor_total">0.00</h5>
                                </li>
                                <li>
                                    <h4>Valor Pago</h4>
                                    <h5 class="money" id="lbl_valor_pago">0.00</h5>
                                </li>
                                <li>
                                    <h4>Desconto</h4>
                                    <h5 id="lbl_valor_desconto"></h5>
                                </li>
                                <li>
                                    <h4>Valor Parcelado</h4>
                                    <h5 id="lbl_valor_parcelado"></h5>
                                </li>
                                <li class="total">
                                    <h4>Troco</h4>
                                    <h5 id="lbl_troco"></h5>
                                </li>
                                <li class="total">
                                    <h4>Total Geral</h4>
                                    <h5 id="lbl_total_geral"></h5>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button id="btn_pagar_os" onclick="realizarPagamento('form_pagamento_os')" type="button" class="btn btn-submit">Criar Pagamento</button>
                <button type="button" class="btn btn-cancel" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
</form>