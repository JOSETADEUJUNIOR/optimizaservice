<div class="modal fade" id="showpayment" tabindex="-1" aria-labelledby="showpayment" aria-hidden="true">
                        <div class="modal-dialog modal-lg modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Pagamentos realizados</h5>
                                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                                </div>
                                <div class="modal-body">
                                    <div class="table-responsive" id="tabelaPagamentos">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th>Data</th>
                                                    <th>Valor pago </th>
                                                    <th>Valor Total </th>
                                                    <th>Numero Parcela</th>
                                                    <th>Valor da parcela</th>
                                                    <th>Data pagamento parcela</th>
                                                    <th>Ação </th>
                                                </tr>
                                            </thead>
                                            <tbody id="tabelaPagamentos">
                                              
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal fade" id="editpayment" tabindex="-1" aria-labelledby="editpayment" aria-hidden="true">
                        <div class="modal-dialog modal-lg modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Edit Payment</h5>
                                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-lg-6 col-sm-12 col-12">
                                            <div class="form-group">
                                                <label>Customer</label>
                                                <div class="input-groupicon">
                                                    <input type="text" value="2022-03-07" class="datetimepicker">
                                                    <div class="addonset">
                                                        <img src="assets/img/icons/datepicker.svg" alt="img">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-sm-12 col-12">
                                            <div class="form-group">
                                                <label>Reference</label>
                                                <input type="text" value="INV/SL0101">
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-sm-12 col-12">
                                            <div class="form-group">
                                                <label>Received Amount</label>
                                                <input type="text" value="0.00">
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-sm-12 col-12">
                                            <div class="form-group">
                                                <label>Paying Amount</label>
                                                <input type="text" value="0.00">
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-sm-12 col-12">
                                            <div class="form-group">
                                                <label>Payment type</label>
                                                <select class="select">
                                                    <option>Cash</option>
                                                    <option>Online</option>
                                                    <option>Inprogress</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-12">
                                            <div class="form-group mb-0">
                                                <label>Note</label>
                                                <textarea class="form-control"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-submit">Submit</button>
                                    <button type="button" class="btn btn-cancel" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>